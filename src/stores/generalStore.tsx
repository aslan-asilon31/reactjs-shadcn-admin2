import { create } from 'zustand';
import Swal from 'sweetalert2';
import API from '@/api/MainApi';
import { z } from 'zod';

interface GeneralStore {
  isModalOpen: boolean; // Menyimpan status modal
  openModal: () => void; // Fungsi untuk membuka modal
  closeModal: () => void; // Fungsi untuk menutup modal
  isLoading: boolean; // Menyimpan status loading
  setLoading: (loading: boolean) => void; // Fungsi untuk mengatur status loading
  errorMessage: string | null; // Menyimpan pesan kesalahan
  setErrorMessage: (message: string | null) => void; // Fungsi untuk mengatur pesan kesalahan
  data: unknown[]; // Menyimpan data global
  setData: (data: any[]) => void; // Fungsi untuk mengatur data
  isAuthenticated: boolean; // Menyimpan status autentikasi
  setAuthenticated: (authenticated: boolean) => void; // Fungsi untuk mengatur status autentikasi
  theme: 'light' | 'dark'; // Menyimpan tema
  setTheme: (theme: 'light' | 'dark') => void; // Fungsi untuk mengatur tema
}

// Membuat store Zustand
const useGeneralStore = create<GeneralStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  errorMessage: null,
  setErrorMessage: (message) => set({ errorMessage: message }),
  data: [],
  setData: (data) => set({ data }),
  isAuthenticated: false,
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}));

export default useGeneralStore;
