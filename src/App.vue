<template>
  <header
    class="px-4 pt-8 pb-16 md:pb-10 bg-header-pattern bg-center bg-no-repeat bg-cover relative flex flex-col items-center h-[284px]"
  >
    <!-- ip search form -->
    <GetIPForm />
    <!--ip details -->
    <IPDetails />
  </header>

  <!--map -->
  <IPMap />
</template>

<style></style>

<script>
import { helpersMixin } from './mixins/helpers.js';
import GetIPForm from './components/GetIPForm.vue';
import IPDetails from './components/IPDetails.vue';
import IPMap from './components/IPMap.vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

export default {
  mixins: [helpersMixin],
  data() {
    return {
      initialIpUrl: 'https://api.ipify.org',
      currentIP: '',
    };
  },
  mounted() {
    const setCurrentIPData = () => {
      axios
        .get(`${this.url}${this.currentIP}`, {
          headers: this.headers, //coming from Mixin - helpers.js
          data: {},
        })
        .then((response) => {
          this.$store.commit('SET_IP_DATA', response.data);
          this.$store.commit('SET_LATITUDE', response.data.location.lat);
          this.$store.commit('SET_LONGITUDE', response.data.location.lng);
        })
        .then(() => {
          this.setMap(); //coming from Mixin - helpers.js
        })
        .catch((error) => {
          console.log(error.response);
        });
    };

    const getCurrentIPData = () => {
      return new Promise((resolve, reject) => {
        axios.get(`${this.initialIpUrl}`).then((response) => {
          this.$store.commit('SET_CURRENT_IP', response.data);
          this.currentIP = this.$store.state.currentIP;
          resolve();
        });
      });
    };

    getCurrentIPData().then(() => setCurrentIPData());
  },
  components: { GetIPForm, IPDetails, IPMap, L },
};
</script>
