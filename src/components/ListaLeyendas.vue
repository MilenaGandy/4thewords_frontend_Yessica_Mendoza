<script lang="ts">
export default {
  data() {
    return {
      nombre: '',
      categoria: '',
      epoca: '',
      creacion: '',
      provincia: null,
      canton: null,
      distrito: null,
      items: [],
      endpoint_provincias: 'http://192.168.1.4:8080/provincias/',
      endpoint_cantones: 'http://192.168.1.4:8080/provincias/1/cantones/',
      endpoint_distritos: 'http://192.168.1.4:8080/provincias/1/cantones/2/distritos/',
      provincias: [],
      cantones: [],
      distritos: [],
    }
  },
  methods: {
    async fetchItems() {
      const response = await fetch('http://192.168.1.4:3000/leyendas');
      this.items = await response.json();
    },
    async fetchProvincias() {
      const response = await fetch(this.endpoint_provincias);
      const provincias = await response.json();
      this.provincias = provincias.map((provincia) => {
        return {
          title: provincia.nombre,
          value: provincia.id
        }
      });
    },
    async fetchCantones() {
      const response = await fetch(this.endpoint_cantones);
      this.cantones = await response.json();
    },
    async fetchDistritos() {
      const response = await fetch(this.endpoint_distritos);
      this.distritos = await response.json();
    }
  },
  mounted() {
    this.fetchItems();
    this.fetchProvincias();
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        return (
          (!this.nombre || item.nombre === this.nombre) &&
          (!this.categoria || item.categoria === this.epoca) &&
          (!this.epoca || item.epoca === this.epoca) &&
          (!this.creacion || item.creacion === this.creacion) &&
          (!this.provincia || item.Provincia === this.provincia) &&
          (!this.canton || item.Canton === this.canton) &&
          (!this.distrito || item.Distrito === this.distrito)
        );
      });
    },
  }
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
          <v-select v-model="nombre" label="Nombre" :items="nombres" variant="solo-filled" hide-details clearable></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select v-model="categoria" label="Categoría" :items="categorias" variant="solo-filled"
            hide-details clearable></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select v-model="epoca" label="Fecha de Leyenda" :items="epocas" variant="solo-filled" hide-details clearable></v-select>
        </v-col>        
        <v-col cols="12" md="4">
          <v-select v-model="creacion" label="Fecha de Creación" :items="creacions" variant="solo-filled" hide-details clearable></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select v-model="provincia" label="Provincia" :items="provincias" variant="solo-filled" hide-details clearable></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select v-model="canton" label="Cantón" :items="cantones" variant="solo-filled" hide-details clearable></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select v-model="distrito" label="Distrito" :items="distritos" variant="solo-filled"
            hide-details clearable></v-select>
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
            <a class="btn" color="error" href="#/crear" icon="mdi-plus" title="Crear nueva leyenda"><i class="mdi mdi-plus mdi-24px" style="color: white; background-color: red;"></i></a>
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
          <tr v-for="item in filteredItems" :key="item.nombre">
            <td>{{ item.nombre }}</td>
            <td>
              <v-img :src="`/public/img/${item.image}`" height="64" cover></v-img>
            </td>
            <td>{{ item.creacion }}</td>
            <td>
              <v-chip :color="item.categoria ? 'green' : 'red'" :text="item.categoria ? 'Magia' : 'Religión'"
                class="text-uppercase" size="small" label></v-chip>
            </td>
            <td>{{ item.epoca }}</td>
            <td>{{ item.Descripcion }}</td>
            <td>
              Provincia: {{ item.Provincia }} <br>
              Cantón: {{ item.Canton }} <br>
              Distrito: {{ item.Distrito }}
            </td>
            <td>
              <a :href="`#/editar/${item.id}`" class="text-decoration-none">
                <v-icon color="#fa0505">mdi-pencil</v-icon>
              </a>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

  </v-container>
</template>