<template>
  <div>
    <GmapMap :center="center" :zoom="14" id="map">
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @mouseover="statusText = m.text"
        @mouseout="statusText = null"
      />
      <div slot="visible">
        <input
          id="input"
          type="tel"
          placeholder="Digiete seu CEP"
          v-model="cep"
          v-mask="'#####-###'"
          @keyup="handle"
        />
        <div id="infos" :class="{ visible: statusText }">
          {{ statusText }}
        </div>
      </div>
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      center: { lat: 0, lng: 0 },
      currentPlace: null,
      statusText: "",
      cep: "",
      markers: [
        {
          position: {
            lat: 48.16091,
            lng: 16.38333,
          },
        },
        {
          position: {
            lat: 48.17427,
            lng: 16.32962,
          },
        },
      ],
      places: [],
    };
  },
  methods: {
    getUBS(cep) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ cep: cep }),
        redirect: "follow",
      };
      fetch("http://localhost:3000/", requestOptions)
        .then((response) => response.json())
        .then((r) => {
          this.center = { lat: r.userLatitude, lng: r.userLongitude };
          this.markers = r.ubs.map((ubs) => {
            return {
              text: ubs.title,
              position: {
                lat: ubs.lat,
                lng: ubs.lon,
              },
            };
          });
        })
        .catch((error) => console.log("error", error));
    },
    handle() {
      this.cep = this.cep.replace("-", "");
      if (this.cep.length === 8) this.getUBS(this.cep);
    },
  },
};
</script>
<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=PT+Sans&display=swap')
#map
  width: 100%
  height: 100vh
  font-family: 'PT Sans', sans-serif
  #infos
    top: 50px
    left: 50%

    transform: translateX(-50%)
    padding: 15px
    border-radius: 50px
    background-color: #fff
    position: absolute
    z-index: 100
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
    transition: all 0.3s cubic-bezier(.25,.8,.25,1)
    display: none
  .visible
    display: block !important
  #input
    width: 200px
    bottom: 25px
    left: 25px
    padding: 15px
    border-radius: 15px
    background-color: #fff
    position: absolute
    z-index: 100
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
    border: none
    &:focus
      outline: 0
</style>