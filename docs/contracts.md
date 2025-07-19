# Subarray with Maximum Sum
In order to get the maximum sum we need to iterate over every subarray and keep the largest sum found.
To do that we will use a nested for loops. The first running from the beginning to the end and call it the lower bound, the second from the end to lower bound will be called the upper bound.
The upper bound loop does not go until the beginning of the array is because then the upper bound will be higher than the lower bound
For each (nested) iteration we will sum the cells in the array between the lower and the upper bound check if it is the maximum sum yet.
