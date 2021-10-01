<template>
    <div class="food-detail">
        <Navbar/>

        <!-- breadcrumb -->
        <div class="container">
            <div class="row mt-5">
                <div class="col">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link to="/" class="text-dark">Home</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/foods" class="text-dark">Foods</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-label="page">Food Order</li>
                        </ol>
                    </nav>
                </div>
            </div>

              <!--  -->
            <div class="row mt-3">
                <div class="col-md-6">
                    <img :src="'../assets/images/'+product.gambar" class="img-fluid shadow" alt="" srcset="">
                </div>
                <div class="col-md-6">
                    <h2><strong>{{ product.nama }}</strong></h2>
                    <hr>
                    <h4>Harga : <strong>Rp. {{ product.harga }}</strong></h4>
                    <form class="mt-4">
                        <div class="form-group">
                            <label for="jumlah_pesanan">Jumlah Pesanan</label>
                            <input type="number" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="keterangan">Keterangan</label>
                            <textarea class="form-control" placeholder="Keterangan seperti : Pedas, Nasi Setengah, ..."></textarea>
                        </div>

                        <button type="submit" class="btn btn-success">
                            <b-icon-cart></b-icon-cart> Pesan
                        </button>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'

export default {
    name: 'FoodDetail',
    components: {
        Navbar,
    },
    data() {
        return {
            product: {},
        }
    },
    methods: {
        setProducts(data) {
            this.product = data;
        },
    },
    mounted() {
        axios.get('http://localhost:3000/products/'+this.$route.params.id)
        .then((response) => {
            // handle success
            this.setProducts(response.data);
            console.log('Berhasil : ', response);
        })
        .catch((error) => {
            // handle error
            console.log('Gagal : ', error);
        });
    }
}
</script>

<style>

</style>