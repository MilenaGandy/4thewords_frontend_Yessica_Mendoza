<script lang="ts">
import type { CustomHttpResponse } from '@/modules/legends/interfaces/apiInterfaces';
import { getLeyendas } from '@/services/leyendaService';
import { getProvincias } from '@/modules/leyendas/services/provinciaService';
import type { Leyenda, Provincia, Canton } from '@/modules/leyendas/interfaces/Leyenda';


export default {
  data() {
    return {
      nombre: null,
      nombres: [],
      categoria: '',
      categorias: [],
      epoca: '',
      creacion: '',
      provincia: null as Provincia | null,
      provincias: [] as Array<Provincia>,
      canton: null,
      distrito: null,
      endpoint_distritos: 'http://192.168.1.4:8080/provincias/1/cantones/2/distritos/',
      
      leyendas: [] as Array<Leyenda>,
      cantones: [],
      distritos: [],
    }
  },
  mounted() {
    /*getLeyendas(
      this.leyendasSuccess,
      this.leyendasError
    );*/
    getProvincias(
      this.provinciasSuccess,
      this.provinciasError
    );
  },
  methods: {
    leyendasSuccess(response: CustomHttpResponse) {
      const results: Array<Leyenda> = response.data;
      this.leyendas = results.map((leyenda: Leyenda) => {
        return {
          id: leyenda.id,
          nombre: leyenda.nombre,
          image: leyenda.image,
          creacion: leyenda.creacion,
          categoria: leyenda.categoria,
          epoca: leyenda.epoca,
          Descripcion: leyenda.Descripcion,
          Provincia: leyenda.Provincia,
          Canton: leyenda.Canton,
          Distrito: leyenda.Distrito
        }
      });
    },
    leyendasError(response: CustomHttpResponse) {
      console.error("Error fetching leyendas:", response);
      this.leyendas = [];
    },
    provinciasSuccess(response: CustomHttpResponse) {
      console.log("Provincias fetched successfully:", response.data);
      this.provincias = response.data as Array<Provincia>;
      console.log("Provincias:", this.provincias);
    },
    provinciasError(response: CustomHttpResponse) {
      console.error("Error fetching provincias:", response);
      this.provincias = [];
    },
  },
}
</script>

<template>
  <v-container>
    <v-card class="" variant="text" elevation="2">
      <v-row>
        <v-col cols="12">
          <v-card-title class="text-h5">Filtros</v-card-title>
        </v-col>
        <v-col cols="12" md="4">
          <v-select v-model="nombre" label="Nombre" :items="nombres" variant="solo-filled" hide-details
            clearable></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select v-model="categoria" label="Categoría" :items="categorias" variant="solo-filled" hide-details
            clearable></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select v-model="creacion" label="Fecha de Creación" variant="solo-filled" hide-details
            clearable></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select v-model="provincia" label="Provincia" variant="solo-filled" hide-details clearable>
            <option 
              v-for="_provincia in provincias" 
              :key="_provincia.id" 
              :value="_provincia.id"
            >
              {{ _provincia.nombre }}
            </option>
          </v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select v-model="canton" label="Cantón" :items="cantones" variant="solo-filled" hide-details
            clearable></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select v-model="distrito" label="Distrito" :items="distritos" variant="solo-filled" hide-details
            clearable></v-select>
        </v-col>
      </v-row>

    </v-card>

    <v-divider color="error" :thickness="4" class="border-opacity-25 my-4"></v-divider>

    <v-card flat class="py-4" rounded="lg" variant="text" elevation="2">
      <v-card-title class="text-h5">
        <v-row>
          <v-col cols="12" md="6">
            Lista de Leyendas
          </v-col>
          <v-col cols="12" md="6" class="text-right">
            <a class="btn" color="error" href="#/crear" icon="mdi-plus" title="Crear nueva leyenda"><i
                class="mdi mdi-plus mdi-24px" style="color: white; background-color: red;"></i></a>
          </v-col>
        </v-row>
      </v-card-title>
      <v-table height="auto">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Imagen</th>
            <th>Fecha de Creación</th>
            <th>Categoria</th>
            <th>Fecha de Leyenda</th>
            <th>Descripción</th>
            <th>Ubicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="leyenda in leyendas" :key="leyenda.nombre">
            <td>{{ leyenda.nombre }}</td>
            <td>
              <v-img :src="`/public/img/${leyenda.image}`" height="64" cover></v-img>
            </td>
            <td>{{ leyenda.creacion }}</td>
            <td>
              <v-chip :color="leyenda.categoria ? 'green' : 'red'" :text="leyenda.categoria ? 'Magia' : 'Religión'"
                class="text-uppercase" size="small" label></v-chip>
            </td>
            <td>{{ leyenda.epoca }}</td>
            <td>{{ leyenda.Descripcion }}</td>
            <td>
              Provincia: {{ leyenda.Provincia }} <br>
              Cantón: {{ leyenda.Canton }} <br>
              Distrito: {{ leyenda.Distrito }}
            </td>
            <td>
              <a :href="`#/editar/${leyenda.id}`" class="text-decoration-none">
                <v-icon color="#fa0505">mdi-pencil</v-icon>
              </a>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

  </v-container>
</template>