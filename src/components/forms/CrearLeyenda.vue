<template>
    <v-card
        class="py-4"
        color="surface-variant"
        rounded="lg"
        variant="text"
    >
        <v-card-title class="text-h5">
            Datos de la Leyenda
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field
                    v-model="nombre"
                    label="Nombre"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="image"
                    label="Imagen"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="Fecha"
                    label="Fecha"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="categoria"
                    label="Categoria"
                    required
                ></v-text-field>
                <v-btn
                    color="primary"
                    @click="crearLeyenda"
                >
                    Crear Leyenda
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
export default {
    data() {
        return {
            nombre: '',
            image: '',
            Fecha: '',
            categoria: '',
        };
    },
    methods: {
        crearLeyenda() {
            console.log('Leyenda creada');
        },
    },
};
</script>