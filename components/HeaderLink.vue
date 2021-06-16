<template>
    <div>
        <nav>
            <ul>
               <li>
                   <router-link to="/">Todo Page</router-link>
                </li>
                 <li>
                    <router-link to="/deletedTodo">Deleted Todo Page</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    components: {}
}
</script>

<style>
nav {
    color: #fff;
}

ul {
    display: flex;
    justify-content: flex-end;
}

li {
    list-style-type: none;
    margin-right: 15px;
}

a {
    color: #fff;
}
</style>