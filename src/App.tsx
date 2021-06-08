import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
import "@/assets/base.less"

export default defineComponent({
  setup() {
    return () => <RouterView />;
  },
});
