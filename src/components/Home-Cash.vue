<script setup>
    import Layout from './Layout.vue';
    import Header from './Header.vue';
    import Resume from './Resume/Index.vue';
    import Graphic from './Resume/Graphic.vue';
    import FilterByDates from './Resume/FilterByDates.vue';
    import Action from './Resume/Action.vue';
    import Movements from './Movements/Movements.vue';
    import { Movement, Type } from '@/Models/Movement';
    import { ref, computed, provide, onBeforeMount } from 'vue';

    const totalMovements = ref([]);
    function removeMovement(id){
        totalMovements.value = totalMovements.value.filter(movement => movement.id !== id);
/*         totalMovements.value = totalMovements.value.map(movement=>{
            if(movement.id == id){
                return new Movement({...movement, amount: 12})
            } else {
                return new Movement(movement)
            }
        }) */
    }
    function addNewMovement(movement){
        totalMovements.value.push(movement);
    }

    const filterDate = ref(3);
    const filterMovementsDate = computed(()=>{
        if(filterDate.value == 1) return totalMovements.value;
        if(filterDate.value == 2) return totalMovements.value;
        if(filterDate.value == 3) return totalMovements.value.filter(movement => movement.date > (new Date().getTime() - 30*24*60*60*1000));
        return totalMovements.value
    });

    const showModalMovement = ref(false);
    function toggleModalMovement(){
        showModalMovement.value = !showModalMovement.value;
    }

    provide('movements',{
        totalMovements,
        removeMovement,
        showModalMovement,
        toggleModalMovement,
        addNewMovement,
        filterDate,
        filterMovementsDate
    });


    onBeforeMount(() => {
        totalMovements.value =  [
        new Movement({ title: 'Salary', description: 'Monthly salary payment', amount: 100, type: Type.INCOME }),
        new Movement({ title: 'Groceries', description: 'Weekly grocery shopping', amount: 150, type: Type.OUTCOME }),
        new Movement({ title: 'Electricity Bill', description: 'Monthly electricity bill payment', amount: 75, type: Type.OUTCOME }),
        new Movement({ title: 'Freelance Work', description: 'Payment for freelance project', amount: 200, type: Type.INCOME }),
        new Movement({ title: 'Gym Membership', description: 'Monthly gym membership fee', amount: 50, type: Type.OUTCOME })
        ];
    });
</script>

<template>
    <Layout>
        <template #header>
            <Header></Header>
        </template>
        <template #resume>
            <Resume>
                <template #graphic>
                    <Graphic>
                        <template #filterByDate>
                            <FilterByDates></FilterByDates>
                        </template>
                    </Graphic>
                </template>
                <template #action>
                    <Action/>
                </template>
            </Resume>
        </template>
        <template #movements>
            <Movements></Movements>
        </template>
    </Layout>
</template>

<style scoped></style>