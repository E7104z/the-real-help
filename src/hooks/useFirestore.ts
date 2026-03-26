import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  type QueryConstraint,
  type DocumentData,
  type DocumentSnapshot,
  type QuerySnapshot,
} from 'firebase/firestore';
import { firestore } from '@/lib/firebase';

interface UseCollectionOptions {
  tenantId: string;
  collectionName: string;
  constraints?: QueryConstraint[];
  pageSize?: number;
  realtime?: boolean;
}

interface UseCollectionResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useCollection<T extends { id: string }>({
  tenantId,
  collectionName,
  constraints = [],
  pageSize = 25,
  realtime = false,
}: UseCollectionOptions): UseCollectionResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);

  const colRef = collection(firestore, 'tenants', tenantId, collectionName);

  const mapDocs = useCallback((snap: QuerySnapshot<DocumentData>): T[] => {
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
  }, []);

  useEffect(() => {
    if (!tenantId) return;

    setLoading(true);
    setError(null);

    const q = query(colRef, ...constraints, orderBy('lastUpdatedAt', 'desc'), limit(pageSize + 1));

    if (realtime) {
      const unsub = onSnapshot(
        q,
        (snap) => {
          const results = mapDocs(snap);
          if (results.length > pageSize) {
            setHasMore(true);
            results.pop();
          } else {
            setHasMore(false);
          }
          setData(results);
          const last = snap.docs[snap.docs.length - 2] ?? snap.docs[snap.docs.length - 1] ?? null;
          setLastDoc(last ?? null);
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        },
      );
      return unsub;
    }

    void (async () => {
      try {
        const snap = await getDocs(q);
        const results = mapDocs(snap);
        if (results.length > pageSize) {
          setHasMore(true);
          results.pop();
        } else {
          setHasMore(false);
        }
        setData(results);
        const last = snap.docs[snap.docs.length - 2] ?? snap.docs[snap.docs.length - 1] ?? null;
        setLastDoc(last ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    })();

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenantId, collectionName, realtime, pageSize]);

  const loadMore = useCallback(async () => {
    if (!lastDoc || !hasMore) return;

    const q = query(
      colRef,
      ...constraints,
      orderBy('lastUpdatedAt', 'desc'),
      startAfter(lastDoc),
      limit(pageSize + 1),
    );

    const snap = await getDocs(q);
    const results = mapDocs(snap);

    if (results.length > pageSize) {
      setHasMore(true);
      results.pop();
    } else {
      setHasMore(false);
    }

    const last = snap.docs[snap.docs.length - 2] ?? snap.docs[snap.docs.length - 1] ?? null;
    setLastDoc(last ?? null);
    setData((prev) => [...prev, ...results]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastDoc, hasMore, pageSize]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setLastDoc(null);
    const q = query(colRef, ...constraints, orderBy('lastUpdatedAt', 'desc'), limit(pageSize + 1));
    try {
      const snap = await getDocs(q);
      const results = mapDocs(snap);
      if (results.length > pageSize) {
        setHasMore(true);
        results.pop();
      } else {
        setHasMore(false);
      }
      setData(results);
      const last = snap.docs[snap.docs.length - 2] ?? snap.docs[snap.docs.length - 1] ?? null;
      setLastDoc(last ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Refresh failed');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

  return { data, loading, error, hasMore, loadMore, refresh };
}

interface UseDocumentResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useDocument<T>(
  tenantId: string,
  collectionName: string,
  docId: string | undefined,
): UseDocumentResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tenantId || !docId) {
      setLoading(false);
      return;
    }

    void (async () => {
      try {
        const ref = doc(firestore, 'tenants', tenantId, collectionName, docId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setData({ id: snap.id, ...snap.data() } as T);
        } else {
          setError('Document not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load document');
      } finally {
        setLoading(false);
      }
    })();
  }, [tenantId, collectionName, docId]);

  return { data, loading, error };
}
