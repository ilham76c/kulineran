<template>
    <div class="pesanan-sukses">
        <Navbar/>
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col text-center">
                    <img src="../../public/assets/images/menunggu.png" width="300" alt="gambar" srcset="">
                    <h2><strong>Sukses!!</strong></h2>
                    <h4>Pesanan Anda ssegera diproses <br> Selamat Menunggu</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
    name: "PesananSukses",
    components: {
        Navbar,
    },
}
</script>

<style>

</style>