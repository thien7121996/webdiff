export const TableHead = () => {
  return (
    <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
      <tr>
        <th scope='col' className='px-6 py-3'>
          Snapshot name
        </th>
        <th scope='col' className='px-6 py-3'>
          Status
        </th>
        <th scope='col' className='px-6 py-3'>
          ID
        </th>
        {/* <th scope='col' className='px-6 py-3'>
          Progress
        </th> */}
        <th scope='col' className='px-6 py-3'>
          Action
        </th>
      </tr>
    </thead>
  );
};
