import { defineComponent } from 'vue'
import { ElEmpty, ElButton } from 'element-plus'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()

    return () => (
      <ElEmpty description="404 NOT FOUND" class="404-page">
        <ElButton
          type="primary"
          {...{
            onClick: () => {
              router.push({ name: 'login' })
            }
          }}
        >
          返回首页
        </ElButton>
      </ElEmpty>
    )
  }
})
