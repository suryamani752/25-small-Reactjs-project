export const PersonalForm = ({ data, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Full Name
      </label>
      <input
        type="text"
        value={data.name}
        onChange={(e) => onChange("name", e.target.value)}
        className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 outline-none"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        value={data.email}
        onChange={(e) => onChange("email", e.target.value)}
        className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 outline-none"
      />
    </div>
  </div>
);

export const AddressForm = ({ data, onChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Street Address
      </label>
      <input
        type="text"
        value={data.street}
        onChange={(e) => onChange("street", e.target.value)}
        className="mt-1 p-3 outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">City</label>
      <input
        type="text"
        value={data.city}
        onChange={(e) => onChange("city", e.target.value)}
        className="mt-1 p-3 outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  </div>
);

export const PaymentForm = ({ data, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Card Number
      </label>
      <input
        type="text"
        value={data.cardNumber}
        onChange={(e) =>
          onChange("cardNumber", e.target.value.replace(/\D/g, "").slice(0, 16))
        }
        className="mt-1 p-3 outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="4242 4242 4242 4242"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Expiry Date
      </label>
      <input
        type="month"
        value={data.expiry}
        onChange={(e) => onChange("expiry", e.target.value)}
        className="mt-1 p-3 outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  </div>
);

export const PreferencesForm = ({ data, onChange }) => (
  <div className="space-y-4">
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={data.newsletter}
        onChange={(e) => onChange("newsletter", e.target.checked)}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label className="ml-2 block text-sm text-gray-900">
        Subscribe to newsletter
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={data.notifications}
        onChange={(e) => onChange("notifications", e.target.checked)}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label className="ml-2 block text-sm text-gray-900">
        Enable notifications
      </label>
    </div>
  </div>
);

export const ConfirmationForm = ({ data, onChange }) => (
  <div className="space-y-4 text-center">
    <div className="flex items-center justify-center">
      <input
        type="checkbox"
        checked={data.terms}
        onChange={(e) => onChange("terms", e.target.checked)}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label className="ml-2 block text-sm text-gray-900">
        I agree to the terms and conditions
      </label>
    </div>
    <p className="text-sm text-gray-500">
      By confirming, you agree to our terms of service and privacy policy.
    </p>
  </div>
);
