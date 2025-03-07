import useBrandStore from '@/stores/brandStore';
import { useState } from 'react';
import { z } from 'zod';

type BrandCreate = {
  name: string;
  error: string | null; 
}

interface ValidationErrors {
  name?: string; // Optional property for name validation error
}

// Skema validasi menggunakan Zod
const brandSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nama Brand harus diisi'),
});

export default function BrandCreate() {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);

  const createBrand = async () => {
    // Reset errors
    setError(null);
    setValidationErrors({});

  

    // Validate input
    const validationResult = brandSchema.safeParse({ name });
    if (!validationResult.success) {
      const validationErrors: ValidationErrors = {};
      validationResult.error.issues.forEach(issue => {
        validationErrors[issue.path[0] as keyof ValidationErrors] = issue.message;
      });
      setValidationErrors(validationErrors);
      return;
    }

    // Membuat slug dari name
    const slug = name.toLowerCase().trim().replace(/\s+/g, '-');
    
    // Create brand using the store
    try {
      await useBrandStore.getState().storeBrand(name, slug);
      setName('');
    } catch (err) {
      console.error(err);
    } finally {
      console.log('');
    }
  };



  return (
    <div className="max-w-2xl px-6 py-16 mx-auto space-y-12">
      <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">Buat Brand Baru</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        createBrand();
      }}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Brand</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {validationErrors.name && <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>}
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Buat Brand'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
