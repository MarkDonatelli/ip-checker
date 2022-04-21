<template>
  <div class="container mx-auto">
    <div
      class="w-full max-w-[1110px] mx-auto flex justify-center items-center flex-col"
    >
      <!-- title -->
      <h1 class="text-white font-medium text-2xl md:text-3xl mb-6">
        IP Address Tracker
      </h1>
      <!-- form / search input -->
      <form
        class="w-full max-w-[555px] mb-7 md:mb-14 md:landscape:mb-7 lg:landscape:mb-14"
      >
        <div class="form-field relative">
          <input
            type="text"
            id="getIP"
            name="getIP"
            class="form-input w-full p-3 md:p-4 md:text-lg font-normal rounded-xl md:rounded-2xl border-2 border-transparent focus:outline-none cursor-pointer"
            :class="{ 'border-red-600': v$.getIP.$error }"
            placeholder="Search for any IP address or domain"
            v-model="v$.getIP.$model"
          />
          <button
            :class="{ 'border-red-600': v$.getIP.$error }"
            @click.prevent="submitForm"
            class="bg-primaryGray text-white absolute right-0 top-0 bottom-0 px-4 rounded-tr-xl rounded-br-xl md:rounded-tr-2xl md:rounded-br-2xl md:px-6 border-t-2 border-b-2 border-r-2 border-transparent hover:bg-primaryGrayHover"
          >
            <img src="/src/assets/images/icon-arrow.svg" />
          </button>
        </div>
        <!-- display error messages -->
        <p
          class="text-xs md:text-sm lg:text-base font-medium tracking-wide absolute"
          v-for="error of v$.$errors"
          :key="error.$uid"
        >
          <strong>{{ error.$message }}</strong>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { required, ipAddress, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { helpersMixin } from '../mixins/helpers.js';
import axios from 'axios';

export default {
  name: 'GetIPForm',
  mixins: [helpersMixin],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      getIP: '',
      cachedIP: '',
    };
  },
  validations() {
    return {
      getIP: {
        required: helpers.withMessage('This field cannot be empty', required),
        ipAddress: helpers.withMessage(
          'Please enter a valid IP address',
          ipAddress
        ),
      },
    };
  },
  methods: {
    async submitForm() {
      const isFormValid = await this.v$.$validate();
      if (!isFormValid) return;

      if (this.cachedIP === this.getIP) {
        return;
      }
      axios
        .get(`${this.url}${this.getIP}`, {
          headers: this.headers,
          data: {},
        })
        .then((response) => {
          this.$store.commit('UPDATE_IP_DATA', response.data);
          this.$store.commit('SET_LATITUDE', response.data.location.lat);
          this.$store.commit('SET_LONGITUDE', response.data.location.lng);

          localStorage.setItem('ip-address', response.data.ip);

          this.cachedIP = localStorage.getItem('ip-address');

          this.$store.state.map.remove();
          this.setMap();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
};
</script>
