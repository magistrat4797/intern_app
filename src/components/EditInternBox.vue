<template>
  <BaseForm @submit.prevent="submitForm" class="add-itern__form">
    <div class="flex flex-wrap flex-col-reverse md:flex-row">
      <div class="w-full mt-4 md:mt-0 md:w-2/3">
        <BaseCard class="md:h-full">
          <div v-if="!editedIntern">
            <TheSpinner />
          </div>
          <template v-else>
            <div class="flex flex-col justify-between h-full md:pt-12">
              <div class="flex flex-wrap -mx-3">
                <div class="w-full sm:w-1/2 px-3">
                  <BaseInput
                    v-model="editedIntern.first_name"
                    label="First Name"
                    variant="outline"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div class="mt-4 sm:mt-0 w-full sm:w-1/2 px-3">
                  <BaseInput
                    v-model="editedIntern.last_name"
                    label="Last Name"
                    variant="outline"
                    placeholder="First Name"
                    required
                  />
                </div>
              </div>
              <div class="mt-6 md:mt-0">
                <BaseButton type="submit" class="w-full md:w-auto">Update User</BaseButton>
              </div>
            </div>
          </template>
        </BaseCard>
      </div>
      <div class="w-full md:w-1/3 md:pl-4 lg:pl-8">
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
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import BaseCard from '@/components/BaseCard.vue';
import BaseForm from '@/components/BaseForm.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import FileInput from '@/components/FileInput.vue';
import TheSpinner from '@/components/TheSpinner.vue';

import useInterns from '@/composables/useInterns';

const route = useRoute();
const router = useRouter();
const { getInternForEdit, updateIntern, editedIntern, avatarDataUrl } = useInterns();

onBeforeMount(() => {
  getInternForEdit(Number(route.params.id));
});

const onAvatarChange = (dataUrl: string) => {
  avatarDataUrl.value = dataUrl;
};

const submitForm = async () => {
  if (editedIntern.value) {
    editedIntern.value.avatar = avatarDataUrl.value;
    updateIntern(editedIntern.value);
    router.push('/');
  }
};
</script>
