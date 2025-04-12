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
    async fetchItem() {
      // Obtener leyenda por id
      // Obtener id
      const id = this.$route.params.leyenda_id;
      const url = `http://192.168.1.4:8080/leyendas/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      this.nombre = data.nombre;
      this.image = data.image;
      this.creacion = data.creacion;
      this.categoria = data.categoria;
      this.epoca = data.epoca;
      this.descripcion = data.Descripcion;
      this.provincia = data.Provincia;
      this.canton = data.Canton;
      this.distrito = data.Distrito;
    },
    editarLeyenda() {
      console.log('Leyenda actualizada');
    },
    cambiarImagen() {
      // abrir el input file
      const input = document.getElementById(`fileInput-${this.image}`);
      input.click();
    },
    eliminarLeyenda() {
      console.log('Leyenda eliminada');
    },
  },
  mounted() {
    this.fetchItem();
  },
};
</script>


<template>
  <v-container>
    <v-card class="py-4" rounded="lg" variant="text">
      <v-card-title class="text-h5">
        Datos de la Leyenda
      </v-card-title>
      <v-divider color="error" :thickness="3" class="border-opacity-25 py-4"></v-divider>
      <v-form>
        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <div>
                <input
                type="file"
                class="d-none"
                :id="`fileInput-${image}`"
              />
              </div>
              <v-img :src="`/public/img/${image}`" height="520" cover>
              </v-img>
              <v-fab color="error" absolute bottom right icon="mdi-pencil" v-on:click="cambiarImagen()">
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
              <v-divider color="#fa0505" :thickness="3" class="border-opacity-25"></v-divider>
              <v-col cols="12" md="6">
                <v-btn block color="error" prepend-icon="mdi-delete" @click="eliminarLeyenda">
                  eliminar Leyenda
                </v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn block color="error" prepend-icon="mdi-pencil" @click="editarLeyenda">
                  Editar Leyenda
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>
