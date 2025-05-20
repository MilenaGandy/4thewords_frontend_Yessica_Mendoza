import { defineStore } from 'pinia';
import { apiService } from '@/services/apiService';
import { Provincia, ProvinciaDetalle } from '../interfaces/Provincia'; // Importaciones actualizadas

interface LeyendasState {
  provinciasLista: Provincia[];       // Estado renombrado
  provinciaDetalle: ProvinciaDetalle | null; // Estado renombrado
  cargandoProvincias: boolean;      // Estado renombrado
  cargandoProvinciaDetalle: boolean; // Estado renombrado
  error: string | null;
}

export const useLeyendasStore = defineStore('leyendas', {
  state: (): LeyendasState => ({
    provinciasLista: [],
    provinciaDetalle: null,
    cargandoProvincias: false,
    cargandoProvinciaDetalle: false,
    error: null,
  }),

  getters: {
    todasLasProvincias: (state) => state.provinciasLista, // Getter renombrado
    provinciaSeleccionada: (state) => state.provinciaDetalle, // Getter renombrado
    estaCargandoProvincias: (state) => state.cargandoProvincias, // Getter renombrado
    estaCargandoProvinciaDetalle: (state) => state.cargandoProvinciaDetalle, // Getter renombrado
    obtenerMensajeError: (state) => state.error,        // Getter renombrado
  },

  actions: {
    async obtenerProvinciasLista() { // Acción renombrada
      this.cargandoProvincias = true;
      this.error = null;

      const response = await apiService.get<Provincia[]>('/leyendas/provincias'); // Ajusta el endpoint

      this.cargandoProvincias = false;

      if (response.data) {
        this.provinciasLista = response.data;
      } else {
        this.error = response.error;
      }
    },

    async obtenerProvincia(id: number) { // Acción renombrada
      this.cargandoProvinciaDetalle = true;
      this.provinciaDetalle = null;
      this.error = null;

      const response = await apiService.get<ProvinciaDetalle>(`/leyendas/provincias/${id}`); // Ajusta el endpoint con el ID

      this.cargandoProvinciaDetalle = false;

      if (response.data) {
        this.provinciaDetalle = response.data;
      } else {
        this.error = response.error;
      }
    },
  },
});