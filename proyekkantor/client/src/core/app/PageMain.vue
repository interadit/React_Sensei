<template>
    <router-view v-if=login></router-view>

    <div class="lp-app" v-bind:class="{toggled: toggled}" v-else>
        <AppMenu :menus=menus :infos=infos :tabmenus=tabmenus />
        <AppHeader :infos=infos v-on:toggle="toggle" :toggled=toggled />

        <main class="lp-body" id="app-body">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import control from './index'
export default control;
</script>