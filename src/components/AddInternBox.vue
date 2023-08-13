<template>
  <BaseForm @submit.prevent="submitForm" class="add-itern__form">
    <div class="flex flex-wrap">
      <div class="w-full md:w-2/3">
        <BaseCard class="md:h-full">
          <div class="flex flex-col justify-between h-full md:pt-12">
            <div class="flex flex-wrap -mx-3">
              <div class="w-full sm:w-1/2 px-3">
                <BaseInput
                  v-model="newIntern.first_name"
                  label="First Name"
                  variant="outline"
                  placeholder="First Name"
                  required
                />
              </div>
              <div class="mt-4 sm:mt-0 w-full sm:w-1/2 px-3">
                <BaseInput
                  v-model="newIntern.last_name"
                  label="Last Name"
                  variant="outline"
                  placeholder="First Name"
                  required
                />
              </div>
            </div>
            <div class="mt-6 md:mt-0">
              <BaseButton type="submit" class="w-full md:w-auto">Add User</BaseButton>
            </div>
          </div>
        </BaseCard>
      </div>
      <div class="w-full md:w-1/3 pt-4 md:pt-0 md:pl-4 lg:pl-8">
        <BaseCard>
          <div class="flex justify-center items-center pt-2 pb-6 sm:pb-8 md:py-10">
            <span
              class="avatar block w-[150px] h-[150px] md:mb-10 rounded-full overflow-hidden border-2 outline outline-2 outline-[#E7EAEE] border-lighter-gray"
            >
              <img v-if="avatarDataUrl" :src="avatarDataUrl" />
              <img v-else src="@/assets/images/default-avatar-2.png" />
            </span>
          </div>
          <FileInput
            class="w-full"
            title="Change Photo"
            icon="fa-solid fa-camera"
            @change="onAvatarChange"
          />
        </BaseCard>
      </div>
    </div>
  </BaseForm>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseCard from '@/components/BaseCard.vue';
import BaseForm from '@/components/BaseForm.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import FileInput from '@/components/FileInput.vue';

import useInterns from '@/composables/useInterns';

import type { NewIntern } from '@/models/intern';

const router = useRouter();
const { addIntern, avatarDataUrl } = useInterns();

const newIntern = ref<NewIntern>({
  first_name: '',
  last_name: '',
  avatar: ''
});
const onAvatarChange = (dataUrl: string) => {
  avatarDataUrl.value = dataUrl;
};

const submitForm = () => {
  if (newIntern.value) {
    newIntern.value.avatar = avatarDataUrl.value;
    addIntern(newIntern.value);
    router.push('/');
  }
};
</script>
