<template>
<div>
  <b-navbar toggleable="lg" type="light">
    <div class="container">
      <b-navbar-brand href="#">Kulineran</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/foods">Foods</router-link>
          </li>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
           <li class="nav-item">
            <router-link class="nav-link" to="/keranjang">
                Keranjang <b-icon-bag></b-icon-bag>
                <span class="badge badge-success ml-2">{{ updateKeranjang ? updateKeranjang.length : jumlah_pesanan.length }}</span>
            </router-link>
          </li>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</div>
  <!-- <nav class="navbar navbar-expand-lg navbar-light">
  <div class="container">
    <a class="navbar-brand" href="#">Kulineran</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/foods">Foods</router-link>
        </li>
      </ul>

      <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
        <li class="nav-item">
            <router-link class="nav-link" to="/keranjang">
                Keranjang <b-icon-bag></b-icon-bag>
                <span class="badge badge-success ml-2">{{ updateKeranjang ? updateKeranjang.length : jumlah_pesanan.length }}</span>
            </router-link>
        </li>
      </ul>
    </div>
  </div>
  </nav> -->
</template>

<script>
import axios from 'axios'
import API_URL from '../utils/constant'

export default {
    name: 'navbar',
    data() {
      return {
        jumlah_pesanan: [],
      };
    },
    props: ['updateKeranjang'],
    methods: {
      setJumlah(data) {
        this.jumlah_pesanan = data;
      }
    },
    mounted() {
       axios.get(`${API_URL}/keranjangs`)
        .then((response) => {
          // handle success
          this.setJumlah(response.data);
          console.log('Berhasil : ', response);
        })
        .catch((error) => {
          // handle error
          console.log('Gagal : ', error);
        });
    },
}
</script>

<style>

</style>