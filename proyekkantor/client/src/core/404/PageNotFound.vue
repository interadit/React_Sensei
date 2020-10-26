<template>
    <div class="message-wrap">
        <h1>404 Not found</h1>
        <h3 class="lp-mb-5">The requested url <span class="previous-route">{{redirectedRoute}}</span> was not found</h3>
        <router-link to="/"><Button label="Return to home" model="clear" color="primary" size="lg" /></router-link>
        <div v-if="fromRoute.length">
            or 
            <router-link :to="fromRoute"><Button label="Return to last page" model="clear" color="primary" size="lg" /></router-link>
            <h4>(URL = {{fromRoute}})</h4>
        </div>
    </div>
</template>

<script>
import control from "./index";
export default control;
</script>

<style lang="less" src="./style.less" scoped></style>