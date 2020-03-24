<template>
  <div>
    <PocketAdd />
    <p>
      You have <span class="font-semibold">{{ count }}</span> in your reading
      list
    </p>
    <ul class="c-grid">
      <li
        v-for="{ item_id, resolved_title, resolved_url } in list"
        :key="item_id"
      >
        <PocketArticle
          :id="item_id"
          :title="resolved_title"
          :url="resolved_url"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import PocketArticle from '@/components/PocketArticle'
import PocketAdd from '@/components/PocketAdd'

/* import { mapState } from 'vuex' */

export default {
  name: 'ArticlesList',
  components: {
    PocketArticle,
    PocketAdd,
  },
  computed: {
    list() {
      return this.$store.getters.sortedList
    },
    count() {
      const nb = this.list.length
      if (nb === 0 || nb === 1) {
        return nb + ' article'
      } else if (nb >= 50) {
        return 'more than 50 articles'
      } else {
        return nb + ' articles'
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
@sreen md {
  .c-grid {
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
  }
}
</style>
