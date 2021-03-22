<template>
  <div id="content">
    main2
    <!-- <div id="main">
      <section class="section01">
        <div class="sentence_wrap">
          <p class="sentence_01"></p>
          <p class="sentence_02"></p>
          <p class="sentence_03"></p>
          <p class="sentence_04"></p>
        </div>
        <canvas class="canvas_01"></canvas>
      </section>
    </div> -->
  </div>
</template>

<script>
export default {
  
}
// 분홍 리본 테스트
// var pathes = $('path');
// pathes.each(function( i, path ) {
// 		var total_length = path.getTotalLength(); // 1번 부분: path한개의 길이 (총 7개)

// 		// path.style.strokeDasharray = total_length + " " + total_length; // 2번 부분 (아래랑 같은데 왜 이렇게 쓴걸까....?)
// 		path.style.strokeDasharray = total_length; // 2번 부분
// 		path.style.strokeDashoffset = total_length; // 3번 부분

// 		// 4번 부분
// 		$(path).animate({
// 				"strokeDashoffset" : 0
// 		}, 1500);
// });

// export default {
//   data() {
//     return {
//       sectionInfo: []
//     };
//   },
//   created() {
//     this.init();
//     this.setLayout();
//   },
//   methods: {
//     init() {
//       this.sectionInfo = [
//         // 1.
//         {
//           type: 'fixed',
//           multiply: 5, // 높이 값 높게 설정
//           objs: {
//             container: document.querySelector('.section01'),
//             sentence_01: document.querySelector('.sentence_01'),
//             sentence_02: document.querySelector('.sentence_02'),
//             sentence_03: document.querySelector('.sentence_03'),
//             sentence_04: document.querySelector('.sentence_04'),
//             canvas: document.querySelector('.canvas_01'),
//             context: document.querySelector('.canvas_01').getContext('2d')
//           }
//         }
//       ]
//     },
//     setLayout() {
//       // var sectionType = sectionInfo[0].type;

//       for(var i=0; i<this.sectionInfo.length; i++) {
//         if(this.sectionInfo[i].type === 'fixed') {
//           this.sectionInfo[i].objs.container.style.height = this.sectionInfo[i].objs.container.offsetHeight * this.sectionInfo[i].multiply + 'px';
//         }
        
//       }

//     }
//   }

// }

</script>
