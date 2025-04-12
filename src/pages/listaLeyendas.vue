<script lang="ts">
import ListaLeyendas from '@/components/ListaLeyendas.vue';
export default {
    components: {
        ListaLeyendas
    }
}
</script>


<template>
  <v-container>
        <v-row>
            <v-col cols="12">
                <v-card
                    class="pt-4"
                    rounded="lg"
                    variant="text"
                    elevation="2"
                >
                    <v-card-title class="text-h3 text-center">
                        Libro de Leyendas Costarricenses
                    </v-card-title>
                    <v-card-text class="text-justify text-h6">
                            En este libro se recopilan las leyendas de Costa Rica más conocidas. Estas son un conjunto de relatos y tradiciones 
                            folclóricas de Costa Rica, ubicadas dentro del folclor narrativo popular, 
                            referidas a algún suceso maravilloso irreal, pero con huellas de realidad, 
                            donde se determinan temas heroicos, de la historia patria, de seres mitológicos, 
                            de almas en pena, de seres sobrenaturales o sobre los orígenes de hechos o lugares, 
                            los cuales se considera que realmente sucedieron y en los cuales se cree.
                    </v-card-text>
                </v-card>
            </v-col>
            <v-divider color="error" :thickness="3" class="border-opacity-25"></v-divider>
            <v-col cols="12">
                <ListaLeyendas />
            </v-col>
        </v-row>
    </v-container>
</template>