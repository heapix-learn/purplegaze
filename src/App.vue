<template>
  <div id="app">
    <app-header/>
    <app-main>
      <router-view/>
    </app-main>
    <app-footer/>
  </div>
</template>

<script>
import AppHeader from './components/layouts/AppHeader';
import AppMain from './components/layouts/AppMain';
import AppFooter from './components/layouts/AppFooter';

export default {
  components: {
    appHeader: AppHeader,
    appMain: AppMain,
    appFooter: AppFooter,
  },
};
</script>

<style>
  html {
    font-size: 62.5%;
  }
  :root {
  --white: #fff;
  --purple: #8100a8;
  --black: #111;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
