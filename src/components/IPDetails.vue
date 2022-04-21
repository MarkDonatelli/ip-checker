<template>
  <div class="w-full flex justify-center">
    <div
      v-for="post in posts"
      :key="post.id"
      class="relative z-10 shadow-md rounded-xl md:rounded-2xl justify-center flex lg:flex-row gap-y-4 gap-x-12 flex-col px-5 pt-5 pb-6 md:px-7 md:pt-7 md:pb-8 w-full max-w-[650px] lg:max-w-[1110px] min-h-[153px] bg-white sm:landscape:flex-row sm:landscape:max-w-[1110px]"
    >
      <!-- col 1 -->
      <div class="text-center lg:text-left after-border-r relative flex-1">
        <h3
          class="text-secondaryGray font-bold text-xs md:text-sm tracking-wider uppercase pb-1 md:pb-2"
        >
          IP Address
        </h3>
        <p class="font-medium text-xl md:text-2xl">{{ post.ip }}</p>
      </div>

      <!-- col 2 -->
      <div class="text-center lg:text-left after-border-r relative flex-1">
        <h3
          class="text-secondaryGray font-bold text-xs md:text-sm tracking-wider uppercase pb-1 md:pb-2"
        >
          Location
        </h3>
        <div class="flex md:flex-col justify-center sm:landscape:flex-col">
          <h3 class="font-medium text-xl md:text-2xl">
            {{ post.location.city === '' ? '' : post.location.city + ',' }}
            {{
              post.location.country === 'US'
                ? this.stateNameToAbbreviation(region)
                : post.location.country
            }}
          </h3>
          <p
            v-if="post.location.postalCode"
            class="font-medium text-xl md:text-2xl"
          >
            <span class="lg:hidden sm:landscape:hidden">&nbsp;</span
            >{{ post.location.postalCode }}
          </p>
        </div>
      </div>

      <!-- col 3 -->
      <div class="text-center lg:text-left after-border-r relative flex-1">
        <h3
          class="text-secondaryGray font-bold text-xs md:text-sm tracking-wider uppercase pb-1 md:pb-2"
        >
          Timezone
        </h3>
        <p class="font-medium text-xl md:text-2xl">
          UTC {{ post.location.timezone }}
        </p>
      </div>

      <!-- col 4 -->
      <div class="text-center lg:text-left relative flex-1">
        <h3
          class="text-secondaryGray font-bold text-xs md:text-sm tracking-wider uppercase pb-1 md:pb-2"
        >
          Isp
        </h3>
        <p class="font-medium text-xl md:text-2xl">
          {{ post.location.country === 'ZZ' ? 'Loopback' : post.isp }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { helpersMixin } from '../mixins/helpers.js';
export default {
  name: 'IPDetails',
  mixins: [helpersMixin],
  computed: {
    posts() {
      return this.$store.state.ipData;
    },
    region() {
      return this.$store.getters.region;
    },
  },
};
</script>
