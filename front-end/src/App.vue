

<template>
  <div>
    <button v-on:click="add">Add rectangle</button>
    <button v-on:click="addText">Add text</button>
    <v-stage ref="stage" :config="stageSize" @mousedown="handleStageMouseDown" @touchstart="handleStageMouseDown">

      <v-layer ref="layer">
        <v-rect v-for="item in rects" :key="item.id" :config="item" @transformend="handleTransformEnd" />
        <v-text v-for="text in texts" :config="text" />
        <v-transformer ref="transformer" />

      </v-layer>
    </v-stage>
  </div>
</template>

<script>


export default {

  data() {
    return {
      stageSize: {
        width: 800,
        height: 600,
      },
      rect_sample: {
        rotation: 0,
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        scaleX: 1,
        scaleY: 1,
        fill: 'red',
        name: 'rect1',
        draggable: true,
      },
      text_sample: {
        x: 5,
        y: 15,
        text: 'Simple Text',
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'green',
        draggable: true,
      },
      rects: [

      ],
      texts: [],
      selectedShapeName: '',

      layer: new Konva.Layer()
    };
  },
  methods: {
    add() {

      this.rects.push(this.rect_sample)
      // this.layer.add(this.text_display);

    },
    addText() {
      this.texts.push(this.text_sample)
    },
    handleTransformEnd(e) {
      // shape is transformed, let us save new attrs back to the node
      // find element in our state
      const rect = this.rects.find(
        (r) => r.name === this.selectedShapeName
      );
      // update the state
      rect.x = e.target.x();
      rect.y = e.target.y();
      rect.rotation = e.target.rotation();
      rect.scaleX = e.target.scaleX();
      rect.scaleY = e.target.scaleY();

      // change fill
      // rect.fill = Konva.Util.getRandomColor();
    },
    handleStageMouseDown(e) {
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = '';
        this.updateTransformer();
        return;
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
        e.target.getParent().className === 'Transformer';
      if (clickedOnTransformer) {
        return;
      }

      // find clicked rect by its name
      const name = e.target.name();
      const rect = this.rects.find((r) => r.name === name);
      if (rect) {
        this.selectedShapeName = name;
      } else {
        this.selectedShapeName = '';
      }
      this.updateTransformer();
    },
    updateTransformer() {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getNode();
      const stage = transformerNode.getStage();
      const { selectedShapeName } = this;

      const selectedNode = stage.findOne('.' + selectedShapeName);
      // do nothing if selected node is already attached
      if (selectedNode === transformerNode.node()) {
        return;
      }

      if (selectedNode) {
        // attach to another node
        transformerNode.nodes([selectedNode]);
      } else {
        // remove transformer
        transformerNode.nodes([]);
      }
    },

  },
};
</script>