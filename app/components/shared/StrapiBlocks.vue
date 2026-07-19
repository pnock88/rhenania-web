<script setup lang="ts">
import type {
  StrapiBlock,
  StrapiLinkNode,
  StrapiTextNode,
} from '~/types/strapi'

defineProps<{
  blocks: StrapiBlock[]
}>()

const isTextNode = (
  node: StrapiTextNode | StrapiLinkNode | StrapiBlock,
): node is StrapiTextNode => {
  return node.type === 'text'
}

const isLinkNode = (
  node: StrapiTextNode | StrapiLinkNode | StrapiBlock,
): node is StrapiLinkNode => {
  return node.type === 'link'
}

const textClasses = (node: StrapiTextNode) => ({
  'font-bold': node.bold,
  italic: node.italic,
  underline: node.underline,
  'line-through': node.strikethrough,
  'rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm': node.code,
})
</script>

<template>
  <div class="space-y-6 text-lg leading-9 text-slate-700">
    <template
      v-for="(block, blockIndex) in blocks"
      :key="blockIndex"
    >
      <p
        v-if="block.type === 'paragraph'"
        class="leading-9"
      >
        <template
          v-for="(child, childIndex) in block.children"
          :key="childIndex"
        >
          <span
            v-if="isTextNode(child)"
            :class="textClasses(child)"
          >
            {{ child.text }}
          </span>

          <a
            v-else-if="isLinkNode(child)"
            :href="child.url"
            class="font-bold text-blue-700 underline transition hover:text-blue-500"
          >
            <template
              v-for="(linkChild, linkIndex) in child.children"
              :key="linkIndex"
            >
              <span :class="textClasses(linkChild)">
                {{ linkChild.text }}
              </span>
            </template>
          </a>
        </template>
      </p>

      <component
        :is="`h${block.level ?? 2}`"
        v-else-if="block.type === 'heading'"
        class="font-black tracking-tight text-slate-950"
        :class="{
          'mt-12 text-4xl': block.level === 2,
          'mt-10 text-3xl': block.level === 3,
          'mt-8 text-2xl': block.level === 4,
        }"
      >
        <template
          v-for="(child, childIndex) in block.children"
          :key="childIndex"
        >
          <span
            v-if="isTextNode(child)"
            :class="textClasses(child)"
          >
            {{ child.text }}
          </span>
        </template>
      </component>

      <component
        :is="block.format === 'ordered' ? 'ol' : 'ul'"
        v-else-if="block.type === 'list'"
        class="space-y-3 pl-7"
        :class="
          block.format === 'ordered'
            ? 'list-decimal'
            : 'list-disc'
        "
      >
        <li
          v-for="(item, itemIndex) in block.children"
          :key="itemIndex"
        >
          <template
            v-for="(child, childIndex) in item.children"
            :key="childIndex"
          >
            <span
              v-if="isTextNode(child)"
              :class="textClasses(child)"
            >
              {{ child.text }}
            </span>
          </template>
        </li>
      </component>

      <blockquote
        v-else-if="block.type === 'quote'"
        class="border-l-4 border-blue-600 bg-blue-50 px-6 py-5 italic text-slate-700"
      >
        <template
          v-for="(child, childIndex) in block.children"
          :key="childIndex"
        >
          <span
            v-if="isTextNode(child)"
            :class="textClasses(child)"
          >
            {{ child.text }}
          </span>
        </template>
      </blockquote>

      <pre
        v-else-if="block.type === 'code'"
        class="overflow-x-auto rounded-2xl bg-slate-950 p-6 text-sm text-slate-100"
      ><code><template
        v-for="(child, childIndex) in block.children"
        :key="childIndex"
      ><template v-if="isTextNode(child)">{{ child.text }}</template></template></code></pre>
    </template>
  </div>
</template>