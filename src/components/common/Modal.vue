<template>
	<!-- vue modal 가져옴 -->
	<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header"> <!-- header solt -->
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body"> <!-- body solt -->
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer"> <!-- footer solt -->
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
 
<script>
export default {
	data() {
		return {
			showModal: false
		}
	}
}
</script>

<style>
.modal-header {position:relative;font-weight:500}
.modal-header button {position:absolute;right:0;top:-8px;font-size:24px;background-color:transparent}
.modal-body input, .modal-body textarea {width:100%;padding:5px 10px;border:1px solid #ccc;box-sizing:border-box}
.modal-body input {border:1px solid #ccc}
.modal-body textarea {max-height:200px;margin:15px 0 0;resize:none;}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {padding:5px 10px;border-radius:5px;font-size:13px;color:#fff;background-color:#172852}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>