function Error({mensaje}) {
  return (
    <div>
        <p className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5">
            {mensaje}
        </p>
    </div>
  )
}

export default Error