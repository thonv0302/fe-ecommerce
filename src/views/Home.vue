<template>
  <div class="max-w-7xl mx-auto">
    <div class="overflow-hidden">
      <Swiper
        :slidePerView="3"
        :spaceBetween="10"
        :time="2000"
        direction="forward"
        :thumbCols="6"
        autoplay
        dragSlide
        navigation
        pagination
        infinitive
      >
        <SwiperSlide v-for="(image, index) in images" :key="index" :rounded="10"
          ><div class="relative rounded-md" style="aspect-ratio: 1 / 1">
            <span class="absolute z-10">{{ index }}</span>

            <img
              :src="image"
              alt=""
              class="absolute object-cover select-c-none z-0"
              :draggable="false"
            /></div
        ></SwiperSlide>
      </Swiper>
    </div>

    <!-- <div class="sticky">
      I will stick to the screen when you reach my scroll position
    </div>

    <p>Some example text..</p>
    <h2>Scroll back up again to "remove" the sticky position.</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam
      velit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
      scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
      congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
      Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent
      convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis
      dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
      venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida
      venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
      pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
    </p> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from '../components/global/common/carousel';

const images = ref([
  'https://direct-upload-files.s3.ap-southeast-1.amazonaws.com/64809bc6f575e28f820769a3/documents/thonguyen/324064518_530507322385003_1388301310363855562_n.jpg',
  'https://direct-upload-files.s3.ap-southeast-1.amazonaws.com/64809bc6f575e28f820769a3/documents/thonguyen/324064518_530507322385003_1388301310363855562_n.jpg',
  'https://direct-upload-files.s3.ap-southeast-1.amazonaws.com/64809bc6f575e28f820769a3/documents/thonguyen/324064518_530507322385003_1388301310363855562_n.jpg',
  'https://direct-upload-files.s3.ap-southeast-1.amazonaws.com/64809bc6f575e28f820769a3/documents/thonguyen/324064518_530507322385003_1388301310363855562_n.jpg',
  'https://direct-upload-files.s3.ap-southeast-1.amazonaws.com/64809bc6f575e28f820769a3/documents/thonguyen/324064518_530507322385003_1388301310363855562_n.jpg',
  'https://direct-upload-files.s3.ap-southeast-1.amazonaws.com/64809bc6f575e28f820769a3/documents/thonguyen/324064518_530507322385003_1388301310363855562_n.jpg',
]);
</script>

<style scoped>
div.sticky {
  /* position: -webkit-sticky; */
  /* position: sticky; */
  top: 0;
  background-color: yellow;
  /* padding: 50px; */
  font-size: 20px;
}
</style>
