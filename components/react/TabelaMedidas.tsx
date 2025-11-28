import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

interface SizeRow {
  tamanho: string
  busto: string
  cintura: string
  quadril: string
}

const TABLE_HEADERS = ['Tamanho', 'Busto', 'Cintura', 'Quadril']

const TABLE_ROWS: SizeRow[] = [
  { tamanho: 'PP', busto: '80', cintura: '62', quadril: '90' },
  { tamanho: 'P', busto: '84 - 88', cintura: '66 - 70', quadril: '94 - 98' },
  { tamanho: 'M', busto: '92 - 96', cintura: '74 - 78', quadril: '102 - 106' },
  {
    tamanho: 'G',
    busto: '100 - 104',
    cintura: '82 - 86',
    quadril: '110 - 114',
  },
  { tamanho: 'GG', busto: '109', cintura: '92', quadril: '119' },
]

const CSS_HANDLES = [
  'tabelaMedidas',
  'tabelaMedidasTitle',
  'tabelaMedidasTable',
  'tabelaMedidasHeaderCell',
  'tabelaMedidasRow',
  'tabelaMedidasCell',
  'tabelaMedidasFooterImage',
  'tabelaMedidasTableContainer',
] as const

export default function TabelaMedidas() {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <section className={handles.tabelaMedidas}>
      <h3 className={handles.tabelaMedidasTitle}>Tabela de medidas</h3>

      <div className={handles.tabelaMedidasTableContainer}>
        <div className={handles.tabelaMedidasTable}>
          <div className={handles.tabelaMedidasRow}>
            {TABLE_HEADERS.map((header) => (
              <div key={header} className={handles.tabelaMedidasHeaderCell}>
                {header}
              </div>
            ))}
          </div>

          {/* Conteúdo das linhas */}
          {TABLE_ROWS.map((row) => (
            <div key={row.tamanho} className={handles.tabelaMedidasRow}>
              <div className={handles.tabelaMedidasCell}>{row.tamanho}</div>
              <div className={handles.tabelaMedidasCell}>{row.busto}</div>
              <div className={handles.tabelaMedidasCell}>{row.cintura}</div>
              <div className={handles.tabelaMedidasCell}>{row.quadril}</div>
            </div>
          ))}
        </div>
        <div className={handles.tabelaMedidasFooterImage}>
          <img
            src="https://pontodamoda.vtexassets.com/assets/vtex.file-manager-graphql/images/20fcbccc-7cec-4820-a0e6-54bddcbebe9f___56025e22befe70706954a7b5ec2ada4d.png"
            alt="Imagem ilustrativa da tabela de medidas"
          />
        </div>
      </div>
    </section>
  )
}
