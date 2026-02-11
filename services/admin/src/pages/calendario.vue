<template>
    <Layout>
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Calendario</h1>
            <p class="text-gray-600">Calendario de Reservaciones</p>
        </div>

        <div class="">

            <div v-if="loading">
                <Spinner/>
            </div>

            <transition name="fade">
                <FullCalendar v-show="!loading" :options="calendarioOptions"/>
            </transition>
        </div>

    </Layout>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import Layout from '../components/Layout.vue';
    import FullCalendar from "@fullcalendar/vue3";
    import Spinner from '../components/Spinner.vue';
    import dayGridPlugin from "@fullcalendar/daygrid";
    import interactionPlugin from "@fullcalendar/interaction";
    import { DashboardService } from '../services/dashboard.service';
    // import '@fullcalendar/daygrid/index.css'

    const loading = ref(true)

    const calendarioOptions = ref({
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        locale: 'es',
        height: 'auto',
        events: []
    })

    onMounted(async () => {
        try {
            const data = await DashboardService.getCalendario()

            calendarioOptions.value.events = data.map(e => ({
                id: e.id,
                title: e.titulo,
                start: e.inicio,
                end: e.fin,
                color: e.color
            }))

        } catch (error) {
            console.error("Error cargando calendario", error)
        } finally {
            loading.value = false
        }
    })
</script>

<style>
.fade-enter-active{
    transitio: opacity .4s ease
}

.fade-enter-from{
    opacity: 0;
}
</style>