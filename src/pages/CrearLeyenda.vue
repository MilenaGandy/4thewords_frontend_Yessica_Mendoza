<script lang="ts">

export default {
  data() {
    return {
      nombre: '',
      image: '',
      creacion: '',
      categoria: '',
      epoca: '',      
      descripcion: '',
      provincia: '',
      canton: '',
      distrito: '',
    };
  },
  methods: {
    crearLeyenda() {
      const url = 'http://192.168.1.4:8080/leyendas/';
      const body = {
        nombre: this.nombre,
        image: this.image,
        creacion: this.creacion,
        categoria: this.categoria,
        epoca: this.epoca,
        descripcion: this.descripcion,
        provincia: this.provincia,
        canton: this.canton,
        distrito: this.distrito,
      };
      fetch (url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      .then(response => response.json())

    },

    subirImagen() {
      // abrir el input file
      const input = document.getElementById(`fileInput-${this.image}`);
      input.click();
    },
  },
};
</script>


<template>
  <v-container>
    <v-card class="py-4" rounded="lg" variant="text">
      <v-card-title class="text-h5">
        Crear Nueva Leyenda
      </v-card-title>
      <v-divider color="error" :thickness="3" class="border-opacity-25 py-4"></v-divider>
      <v-card-text class="text-justify text-h6">
        En esta sección puedes crear una nueva leyenda para el libro de leyendas costarricenses.
      </v-card-text>
    </v-card>
    <v-card class="pa-4" rounded="lg" variant="text" elevation="2">
      <v-form>
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="text-center pa-2">
              <div>
                <input
                type="file"
                class="d-none"
                :id="`fileInput-${image}`"
              />
              </div>
              <v-img :src="`/public/img/${image}`" height="520" cover>
              </v-img>
              <v-fab color="error" absolute bottom right icon="mdi-pencil" v-on:click="subirImagen()">
              </v-fab>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field v-model="nombre" label="Nombre" required variant="outlined" hide-details>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field type="date" v-model="creacion" label="Fecha de Creación" required variant="outlined" hide-details></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select v-model="epoca" label="Fecha de Leyenda" required variant="outlined" hide-details ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select v-model="categoria" label="Categoria" required variant="outlined" hide-details ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="provincia" label="Provincia" required variant="outlined" hide-details ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="canton" label="Canton" required variant="outlined" hide-details></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="distrito" label="Distrito" required variant="outlined" hide-details></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea v-model="descripcion" label="Descripción" required variant="outlined" hide-details></v-textarea>
              </v-col>
              <v-divider color="error" :thickness="3" class="border-opacity-25"></v-divider>
              <v-col cols="12">
                <v-btn block color="error" @click="crearLeyenda">
                  Crear Nueva Leyenda
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>
