import { useState, useEffect } from 'react';

interface Domain {
  name: string;
  price: number;
  category: string;
  extension: string;
  description: string;
  registered: string;
  traffic: string;
  registrationDate: string;
  firstRegistrationDate: string;
  listedDate: string;
}

export function useDomain(name: string | undefined) {
  const [domain, setDomain] = useState<Domain | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) {
      setLoading(false);
      return;
    }

    const fetchDomain = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/domains/${encodeURIComponent(name)}`);
        
        if (!response.ok) {
          throw new Error('Домен не найден');
        }
        
        const data = await response.json();
        setDomain(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки');
        setDomain(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDomain();
  }, [name]);

  return { domain, loading, error };
}
