<script lang="ts">
    import AnnouncementList from '$lib/components/class/AnnouncementList.svelte';
    import ClassHeader from '$lib/components/class/ClassHeader.svelte';
    import FileList from '$lib/components/class/FileList.svelte';
    import TeacherActions from '$lib/components/class/TeacherActions.svelte';

    import type { PageProps } from './$types'

    let { data }: PageProps = $props();
</script>

<div class="min-h-screen bg-[#FFFDF5]">
    <ClassHeader 
        level={data.clase?.grado || 'No definido'} 
        studentCount={12} 
        className={data.clase?.nombre || 'No definido'} 
        teacherName={data.profesor?.user?.name || 'Profesor'}
        classCode={data.codigo?.codigo || 'No definido'} 
    />

    <!-- Content -->
    <div class="max-w-5xl mx-auto px-4 py-10 md:py-14">
        {#if data.userRole === 'profesor'}
            <TeacherActions />
        {/if}

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Main: Announcements -->
            <div class="lg:col-span-2">
                <AnnouncementList announcements={data.contenido?.anuncios} />
            </div>

            <!-- Sidebar: Files -->
            <div class="lg:col-span-1">
                <FileList files={data.contenido?.archivos} />
            </div>
        </div>
    </div>
</div>
