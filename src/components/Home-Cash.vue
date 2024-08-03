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
    }
    function addNewMovement(movement){
        totalMovements.value.push(movement);
    }
    function updateMovemente(updatedMovement){
        totalMovements.value = totalMovements.value.map(movement=>{
            if(movement.id == updatedMovement.id){
                return new Movement({...updatedMovement})
            } else {
                return new Movement(movement)
            }
        })
    };

    const currentIdUpdatedMovement = ref(null);
    const currentUpdateMovement = computed(()=>{
        if(currentIdUpdatedMovement.value){
            return totalMovements.value.find((mov)=>mov.id == currentIdUpdatedMovement.value);
        }
        return null;
    });
    function setIdUpdatedMovement(newId){
        currentIdUpdatedMovement.value = newId;
        toggleModalUpdateMovement();
    }

    const showModalUpdateMovement = ref(false);
    function toggleModalUpdateMovement(){
        showModalUpdateMovement.value = !showModalUpdateMovement.value;
    }

    const filterDate = ref(3);
    const rangeDates = ref([]);
    const filterMovementsDate = computed(()=>{
        if(filterDate.value == 1) return totalMovements.value;
        if(filterDate.value == 2) return totalMovements.value.filter(movement=>checkInRange(movement));
        if(filterDate.value == 3) return totalMovements.value.filter(movement => movement.date > (new Date().getTime() - 30*24*60*60*1000));
        return totalMovements.value
    });
    function checkInRange(movement){
        const movementDate = new Date(movement.date).getTime();
        const statDate = new Date(rangeDates.value[0]).getTime();
        const endDate = new Date(rangeDates.value[1]).getTime();
        const isValid = movementDate >= statDate && movementDate <= endDate;
        return isValid;
    }

    const showModalMovement = ref(false);
    function toggleModalMovement(){
        showModalMovement.value = !showModalMovement.value;
    };

    const showModalChooseDate = ref(false);
    function toggleModalChooseDate(){
        showModalChooseDate.value = !showModalChooseDate.value;
    }

    provide('movements',{
        totalMovements,
        removeMovement,
        showModalMovement,
        toggleModalMovement,
        addNewMovement,
        filterDate,
        rangeDates,
        filterMovementsDate,
        currentIdUpdatedMovement,
        currentUpdateMovement,
        setIdUpdatedMovement,
        toggleModalUpdateMovement,
        showModalUpdateMovement,
        updateMovemente,
        toggleModalChooseDate,
        showModalChooseDate
    });


    onBeforeMount(() => {
        totalMovements.value =  [
        new Movement({ title: 'Salary', description: 'Monthly salary payment', amount: 100, type: Type.INCOME, date: new Date('04-15-2024') }),
        new Movement({ title: 'Groceries', description: 'Weekly grocery shopping', amount: 150, type: Type.OUTCOME, date: new Date('05-15-2024') }),
        new Movement({ title: 'Electricity Bill', description: 'Monthly electricity bill payment', amount: 75, type: Type.OUTCOME, date: new Date('06-15-2024') }),
        new Movement({ title: 'Freelance Work', description: 'Payment for freelance project', amount: 200, type: Type.INCOME, date: new Date('07-15-2024') }),
        new Movement({ title: 'Gym Membership', description: 'Monthly gym membership fee', amount: 50, type: Type.OUTCOME, date: new Date('08-1-2024') })
        ];
        console.log(totalMovements.value)
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
            <Movements/>
        </template>
    </Layout>
</template>

<style scoped></style>