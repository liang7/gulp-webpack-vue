<template>
	<div>
		<dashboard></dashboard>
		<employeeLoans></employeeLoans>
	</div>
</template>
<script>
import dashboard from './dashboard'
import employeeLoans from './employeeLoans'
export default{
	components: {
		dashboard, employeeLoans
	},
	data() {
		return {}
	}
}
</script>