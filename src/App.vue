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
  <div
    class="flex items-center h-[70vh] md:h-[90vh] lg:h-[80vh]"
    v-if="loading"
  >
    <Spinner />
  </div>
  <div v-else>
    <IPMap />
  </div>
</template>

<style></style>

<script>
import { helpersMixin } from './mixins/helpers.js';
import GetIPForm from './components/GetIPForm.vue';
import IPDetails from './components/IPDetails.vue';
import IPMap from './components/IPMap.vue';
import Spinner from './components/Spinner.vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'src/assets/images/marker-icon-2x.png',
  iconUrl: 'src/assets/images/marker-icon.png',
  shadowUrl: 'src/assets/images/marker-shadow.png',
});

export default {
  mixins: [helpersMixin],
  data() {
    return {
      initialIpUrl: 'https://api.ipify.org',
      currentIP: '',
      loading: true,
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
        this.loading = true;
        setTimeout(() => {
          axios.get(`${this.initialIpUrl}`).then((response) => {
            this.$store.commit('SET_CURRENT_IP', response.data);
            this.currentIP = this.$store.state.currentIP;
            resolve();
            this.loading = false;
          });
        }, 1000);
      });
    };

    getCurrentIPData().then(() => setCurrentIPData());
  },
  components: { GetIPForm, IPDetails, Spinner, IPMap, L },
};
</script>
