<template>
  <div>
    <PocketAdd class="py-4" />
    <p>
      You have <span class="font-semibold">{{ count }}</span> in your reading
      list
    </p>

    <transition-group
      name="article-list"
      tag="ul"
      class="grid grid-flow-row-dense grid-cols-1 row-gap-2 col-gap-3 mb-4 lg:grid-cols-2"
      enter-active-class="transition-opacity duration-300"
      leave-active-class="absolute transition-opacity duration-300"
      leave-to-class="opacity-0"
      move-class="transition-transform duration-200"
    >
      <li
        v-for="{ item_id, resolved_title, resolved_url, given_url } in $store
          .state.list"
        :key="item_id"
      >
        <PocketArticle
          :id="item_id"
          :title="resolved_title"
          :url="resolved_url || given_url"
        />
      </li>
    </transition-group>
  </div>
</template>

<script>
import PocketArticle from '@/components/PocketArticle'
import PocketAdd from '@/components/PocketAdd'

export default {
  name: 'ArticlesList',
  components: {
    PocketArticle,
    PocketAdd,
  },
  computed: {
    count() {
      const nb = this.$store.state.list.length
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
