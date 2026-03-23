import RegistrationRow from "./RegistrationRow";

const RegistrationsTable = ({ registrations, fields, reload, onSelect }) => {
  if (registrations.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-6 text-sm">
        No registrations yet
      </div>
    );
  }

  return (

    <div className="overflow-x-auto">

      <table className="min-w-[700px] w-full text-sm">

        <thead className="border-b border-border text-muted-foreground">

          <tr>

            <th className="text-left py-3 px-2 whitespace-nowrap">
              ID
            </th>

            {fields.map((field) => (
              <th
                key={field.id}
                className="text-left px-2 whitespace-nowrap"
              >
                {field.label}
              </th>
            ))}

            <th className="text-left px-2 whitespace-nowrap">
              Status
            </th>

            <th className="text-left px-2 whitespace-nowrap">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {registrations.map((reg) => (
            <RegistrationRow
              key={reg.id}
              reg={reg}
              fields={fields}
              reload={reload}
              onSelect={onSelect}
            />
          ))}

        </tbody>

      </table>

    </div>

  );
};

export default RegistrationsTable;