<script lang="ts">
    import AnnouncementList from '$lib/components/class/AnnouncementList.svelte';
    import ClassHeader from '$lib/components/class/ClassHeader.svelte';
    import FileList from '$lib/components/class/FileList.svelte';
    import TeacherActions from '$lib/components/class/TeacherActions.svelte';

    import type { PageProps } from './$types'

    let { data }: PageProps = $props();
</script>

<div class="min-h-screen bg-cream">
    <ClassHeader 
        level={data.clase?.grado || 'No definido'} 
        studentCount={data.numero_alumnos.numero_alumnos || 0} 
        className={data.clase?.nombre || 'No definido'} 
        teacherName={data.profesor?.user?.name || 'Profesor'}
        classCode={data.codigo?.codigo || 'No definido'} 
        description={data.clase?.descripcion}
        isTeacher={data.userRole === 'profesor'}
    />

    <!-- Content -->
    <div class="max-w-5xl mx-auto px-4 py-8 md:py-10">
        {#if data.userRole === 'profesor'}
            <TeacherActions />
        {/if}

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Main: Announcements -->
            <div class="lg:col-span-2">
                <AnnouncementList announcements={data.contenido?.anuncios} isTeacher={data.userRole === 'profesor'} />
            </div>

            <!-- Sidebar: Files -->
            <div class="lg:col-span-1">
                <FileList files={data.contenido?.archivos} isTeacher={data.userRole === 'profesor'} />
            </div>
        </div>
    </div>
</div>
