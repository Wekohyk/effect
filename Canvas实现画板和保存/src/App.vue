<template>
  <div>
    <div class="mb-10 flex items-center">
      <el-button @click="changeType('huabi')" type="primary">画笔</el-button>
      <el-button @click="changeType('rect')" type="success">正方形</el-button>
      <el-button @click="changeType('arc')" type="warning" class="mr-10">
        圆形
      </el-button>
      <div>颜色：</div>
      <el-color-picker v-model="color"></el-color-picker>
      <el-button @click="clear">清空</el-button>
      <el-button @click="saveImg">保存</el-button>
    </div>
    <canvas
      id="canvas"
      class="border-1 border-solid border-block"
      width="800"
      height="400"
      @mousedown="canvasDown"
      @mousemove="canvasMove"
      @mouseout="canvasUp"
      @mouseup="canvasUp"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const type = ref('huabi');
const isDraw = ref(false);
const canvasDom = ref<HTMLCanvasElement>();
const ctx = ref<CanvasRenderingContext2D>();
const beginX = ref(0);
const beginY = ref(0);
const color = ref('#000');
const imageData = ref<ImageData | null>(null);

onMounted(() => {
  canvasDom.value = document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvasDom.value) return;
  ctx.value = canvasDom.value.getContext('2d', {
    willReadFrequently: true,
  }) as CanvasRenderingContext2D;
});

const changeType = (newType: string) => {
  type.value = newType;
};

const canvasDown = (e: { pageX: number; pageY: number }) => {
  isDraw.value = true;
  beginX.value = e.pageX - canvasDom.value!.offsetLeft;
  beginY.value = e.pageY - canvasDom.value!.offsetTop;
};

const canvasMove = (e: { pageX: number; pageY: number }) => {
  if (!isDraw.value) return;
  if (canvasDom.value) {
    beginX.value = e.pageX - canvasDom.value.offsetLeft;
    beginY.value = e.pageY - canvasDom.value.offsetTop;
  }
};

const canvasUp = () => {
  imageData.value = ctx.value!.getImageData(0, 0, 800, 400);
  isDraw.value = false;
};

const huabiFn = (
  ctx: {
    beginPath: () => void;
    arc: (
      arg0: any,
      arg1: any,
      arg2: number,
      arg3: number,
      arg4: number,
    ) => void;
    fillStyle: string;
    fill: () => void;
    closePath: () => void;
  },
  x: any,
  y: any,
) => {
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.fillStyle = color.value;
  ctx.fill();
  ctx.closePath();
};

const rectFn = (
  ctx: {
    clearRect: (arg0: number, arg1: number, arg2: number, arg3: number) => void;
    putImageData: (
      arg0: ImageData,
      arg1: number,
      arg2: number,
      arg3: number,
      arg4: number,
      arg5: number,
      arg6: number,
    ) => any;
    beginPath: () => void;
    strokeStyle: string;
    rect: (arg0: number, arg1: number, arg2: number, arg3: number) => void;
    stroke: () => void;
    closePath: () => void;
  },
  x: number,
  y: number,
) => {
  ctx.clearRect(0, 0, 800, 400);
  imageData.value && ctx.putImageData(imageData.value, 0, 0, 0, 0, 800, 400);
  ctx.beginPath();
  ctx.strokeStyle = color.value;
  ctx.rect(beginX.value, beginY.value, x - beginX.value, y - beginY.value);
  ctx.stroke();
  ctx.closePath();
};

const arcFn = (ctx: any, x: number, y: number) => {
  isDraw.value && ctx.clearRect(0, 0, 800, 400);
  imageData.value && ctx.putImageData(imageData.value, 0, 0, 0, 0, 800, 400);
  ctx.beginPath();
  ctx.strokeStyle = color.value;
  ctx.arc(
    beginX.value,
    beginY.value,
    Math.round(
      Math.sqrt(
        (x - beginX.value) * (x - beginX.value) +
          (y - beginY.value) * (y - beginY.value),
      ),
    ),
    0,
    2 * Math.PI,
  );
  ctx.stroke();
  ctx.closePath();
};

const saveImg = () => {
  const url = canvasDom.value!.toDataURL();
  const a = document.createElement('a');
  a.download = 'sunshine';
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const clear = () => {
  imageData.value = null;
  ctx.value!.clearRect(0, 0, 800, 400);
};
</script>

<style scoped lang="scss"></style>
