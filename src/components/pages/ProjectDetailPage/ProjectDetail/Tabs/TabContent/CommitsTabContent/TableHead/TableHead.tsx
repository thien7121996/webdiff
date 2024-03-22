export const TableHead = () => {
  return (
    <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
      <tr className='flex'>
        <th className='w-1/6 px-6 py-3 text-center'>Visual ID</th>
        <th className='w-1/6 px-6 py-3 text-center'>Success</th>
        <th className='w-1/6 px-6 py-3 text-center'>Fail</th>
        <th className='w-1/6 px-6 py-3 text-center'>Progress</th>
        <th className='w-1/6 px-6 py-3 text-center'>Created At</th>
        <th className='w-1/6 px-6 py-3 text-center'>Action</th>
      </tr>
    </thead>
  );
};
