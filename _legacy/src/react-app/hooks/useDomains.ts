import { useState, useEffect } from 'react';

export interface Domain {
  name: string;
  price: number;
  category: string;
  extension: string;
  description?: string;
  registered?: string;
  traffic?: string;
  registrationDate?: string;
  firstRegistrationDate?: string;
  listedDate?: string;
}

export function useDomains() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDomains() {
      try {
        const response = await fetch('/api/domains');
        if (!response.ok) {
          throw new Error('Failed to fetch domains');
        }
        const data = await response.json();
        setDomains(data);
      } catch (err) {
        console.error('Error fetching domains:', err);
        setError('Не удалось загрузить домены');
      } finally {
        setLoading(false);
      }
    }

    fetchDomains();
  }, []);

  return { domains, loading, error };
}

export function useDomain(name: string) {
  const [domain, setDomain] = useState<Domain | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDomain() {
      if (!name) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/domains/${encodeURIComponent(name)}`);
        if (!response.ok) {
          throw new Error('Domain not found');
        }
        const data = await response.json();
        setDomain(data);
      } catch (err) {
        console.error('Error fetching domain:', err);
        setError('Домен не найден');
      } finally {
        setLoading(false);
      }
    }

    fetchDomain();
  }, [name]);

  return { domain, loading, error };
}
