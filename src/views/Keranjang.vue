<template>
  <div class="keranjang">
    <Navbar :updateKeranjang="keranjangs"/>

    <div class="container">
      <!-- breadcrumb -->
      <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/foods" class="text-dark">Foods</router-link>
              </li>
              <li class="breadcrumb-item active" aria-label="page">
                Keranjang
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2>Keranjang <strong>Saya</strong></h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Makanan</th>
                  <th scope="col">Keterangan</th>
									<th scope="col">Jumlah</th>
									<th scope="col">Harga</th>
									<th scope="col">Total Harga</th>
									<th scope="col">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(keranjang, index) in keranjangs" :key="keranjang.id">
									<td>{{ index+1 }}</td>
                  <td>
										<img :src="'../assets/images/'+keranjang.products.gambar" class="img-fluid shadow" width="250" alt="" srcset="">
									</td>
                  <td><strong>{{ keranjang.products.nama }}</strong></td>
                  <td>
										{{ keranjang.keterangan ? keranjang.keterangan : '-' }}
									</td>
									<td>
										{{ keranjang.jumlah_pesanan }}
									</td>
									<td align="right">Rp. {{ keranjang.products.harga }}</td>
									<td align="right"><strong>Rp. {{ keranjang.products.harga * keranjang.jumlah_pesanan }}</strong></td>
									<td align="center" class="text-danger">
										<b-icon-trash @click="hapusKeranjang(keranjang.id)"></b-icon-trash>
									</td>
                </tr>

								<tr>
									<td colspan="6" align="right">
										<strong>Total Harga:</strong>
									</td>
                  <td align="right">
                    <strong>Rp. {{ totalHarga }}</strong>
                  </td>
                  <td></td>
								</tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- form untuk checkout -->
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="nama">Nama :</label>
              <input type="text" class="form-control" v-model="pesan.nama">
            </div>
            <div class="form-group">
              <label for="noMeja">Nomor Meja :</label>
              <input type="text" class="form-control" v-model="pesan.noMeja">
            </div>
            <button type="submit" class="btn btn-success float-right" @click="checkout">
              <b-icon-cart></b-icon-cart> Pesan
            </button>
        </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from 'axios';
import { API_URL } from '../utils/constant';

export default {
  name: "Keranjang",
  components: {
    Navbar,
  },
	data() {
		return {
			keranjangs: [],
      pesan: {},
		}
	},
	methods: {
		setKeranjangs(data) {
			this.keranjangs = data;
		},
    hapusKeranjang(id) {
      axios.delete(`${API_URL}/keranjangs/`+id)
        .then((response) => {
            // handle success
            console.log('Berhasil : ', response);
        })
        .catch((error) => {
            // handle error
            console.log('Gagal : ', error);
        });   
   
      // update data keranjang
      axios.get(`${API_URL}/keranjangs`)
        .then((response) => {
            // handle success
            this.setKeranjangs(response.data);
            console.log('Berhasil : ', response);
        })
        .catch((error) => {
            // handle error
            console.log('Gagal : ', error);
        });
    },
    checkout() {
      if (this.pesan.nama && this.pesan.noMeja) {
        this.pesan.keranjangs = this.keranjangs;
        axios.post(`${API_URL}/pesanans`, this.pesan)
          .then((response) => {
            // hapus semua keranjangs
            this.keranjangs.map((item) => {
               return axios.delete(`${API_URL}/keranjangs/`+item.id)
                .catch((error) => {
                    // handle error
                    console.log('Gagal : ', error);
                });  
            });

            this.$router.push({ path: '/pesanan-sukses' })
            console.log('Berhasil : ', response);
          })
          .catch((error) => {
              // handle error
              console.log('Gagal : ', error);
          });
      } else {
        alert('Nama dan Nomor Meja harus diisi!');
      }
    }
	},
	mounted() {
		axios.get(`${API_URL}/keranjangs`)
			.then((response) => {
					// handle success
					this.setKeranjangs(response.data);
					console.log('Berhasil : ', response);
			})
			.catch((error) => {
					// handle error
					console.log('Gagal : ', error);
			});
	},
	computed: {
		totalHarga() {
			return this.keranjangs.reduce((items, data) => {
				return items + (data.products.harga * data.jumlah_pesanan);
			}, 0);
		}
	}
};
</script>

<style>
</style>