import type { Service } from '../data/services'

type ServiceCardProps = {
  service: Service
}

function ServiceCard({ service }: ServiceCardProps) {
  const initials = service.provider
    .split(' ')
    .map((word) => word[0])
    .join('')

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition flex flex-col">
      <span className="self-start px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-semibold">
        {service.category}
      </span>

      <h3 className="mt-4 text-xl font-semibold text-gray-900">{service.title}</h3>
      <p className="mt-2 text-gray-600 flex-1">{service.description}</p>

      <div className="mt-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-900 font-bold text-sm flex items-center justify-center">
          {initials}
        </div>
        <div>
          <p className="font-medium text-gray-900">{service.provider}</p>
          <p className="text-sm text-gray-500">★ {service.rating}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="font-semibold text-blue-950">{service.price}</span>
        <button className="bg-blue-900 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-800">
          Contact
        </button>
      </div>
    </div>
  )
}

export default ServiceCard