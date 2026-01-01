"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Weight, Search } from "lucide-react"

interface BoltWeightData {
  bolts: {
    [key: string]: Array<{ length: number; weight: number }>
  }
  nuts: {
    [key: string]: number
  }
  washers: {
    [key: string]: number
  }
}

interface ListItem {
  id: string
  type: "bolt" | "nut" | "washer"
  size: string
  quantity: number
  unitWeight: number
  totalWeight: number
}

export default function CivataHesaplamaPage() {
  const [weightData, setWeightData] = useState<BoltWeightData | null>(null)
  const [itemList, setItemList] = useState<ListItem[]>([])

  // Bolt selection
  const [selectedBoltSize, setSelectedBoltSize] = useState("")
  const [boltSearchQuery, setBoltSearchQuery] = useState("")
  const [isBoltDropdownOpen, setIsBoltDropdownOpen] = useState(false)
  const [boltQuantity, setBoltQuantity] = useState(100)

  // Nut selection
  const [selectedNutSize, setSelectedNutSize] = useState("")
  const [nutSearchQuery, setNutSearchQuery] = useState("")
  const [isNutDropdownOpen, setIsNutDropdownOpen] = useState(false)
  const [nutQuantity, setNutQuantity] = useState(100)

  // Washer selection
  const [selectedWasherSize, setSelectedWasherSize] = useState("")
  const [washerSearchQuery, setWasherSearchQuery] = useState("")
  const [isWasherDropdownOpen, setIsWasherDropdownOpen] = useState(false)
  const [washerQuantity, setWasherQuantity] = useState(100)

  useEffect(() => {
    fetch("/data/bolt-weights.json")
      .then((res) => res.json())
      .then((data) => setWeightData(data))
  }, [])

  const getBoltOptions = () => {
    if (!weightData) return []
    const options: Array<{ label: string; weight: number }> = []
    Object.entries(weightData.bolts).forEach(([size, lengths]) => {
      lengths.forEach((item) => {
        options.push({
          label: `${size} x ${item.length}`,
          weight: item.weight,
        })
      })
    })
    return options
  }

  const getNutOptions = () => {
    if (!weightData) return []
    return Object.entries(weightData.nuts).map(([size, weight]) => ({
      label: size,
      weight,
    }))
  }

  const getWasherOptions = () => {
    if (!weightData) return []
    return Object.entries(weightData.washers).map(([size, weight]) => ({
      label: size,
      weight,
    }))
  }

  const addBolt = () => {
    if (!selectedBoltSize) return

    const boltInfo = getBoltOptions().find((b) => b.label === selectedBoltSize)
    if (!boltInfo) return

    const newItem: ListItem = {
      id: Date.now().toString(),
      type: "bolt",
      size: selectedBoltSize,
      quantity: boltQuantity,
      unitWeight: boltInfo.weight,
      totalWeight: boltInfo.weight * boltQuantity,
    }

    setItemList([...itemList, newItem])
    setSelectedBoltSize("")
    setBoltSearchQuery("")
    setBoltQuantity(100)
  }

  const addNut = () => {
    if (!selectedNutSize) return

    const nutInfo = getNutOptions().find((n) => n.label === selectedNutSize)
    if (!nutInfo) return

    const newItem: ListItem = {
      id: Date.now().toString(),
      type: "nut",
      size: selectedNutSize,
      quantity: nutQuantity,
      unitWeight: nutInfo.weight,
      totalWeight: nutInfo.weight * nutQuantity,
    }

    setItemList([...itemList, newItem])
    setSelectedNutSize("")
    setNutSearchQuery("")
    setNutQuantity(100)
  }

  const addWasher = () => {
    if (!selectedWasherSize) return

    const washerInfo = getWasherOptions().find((w) => w.label === selectedWasherSize)
    if (!washerInfo) return

    const newItem: ListItem = {
      id: Date.now().toString(),
      type: "washer",
      size: selectedWasherSize,
      quantity: washerQuantity,
      unitWeight: washerInfo.weight,
      totalWeight: washerInfo.weight * washerQuantity,
    }

    setItemList([...itemList, newItem])
    setSelectedWasherSize("")
    setWasherSearchQuery("")
    setWasherQuantity(100)
  }

  const removeItem = (id: string) => {
    setItemList(itemList.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    setItemList(
      itemList.map((item) => {
        if (item.id !== id) return item
        return {
          ...item,
          quantity: newQuantity,
          totalWeight: item.unitWeight * newQuantity,
        }
      }),
    )
  }

  const grandTotal = itemList.reduce((sum, item) => sum + item.totalWeight, 0)

  const filteredBolts = getBoltOptions().filter((bolt) =>
    bolt.label.toLowerCase().includes(boltSearchQuery.toLowerCase()),
  )

  const filteredNuts = getNutOptions().filter((nut) => nut.label.toLowerCase().includes(nutSearchQuery.toLowerCase()))

  const filteredWashers = getWasherOptions().filter((washer) =>
    washer.label.toLowerCase().includes(washerSearchQuery.toLowerCase()),
  )

  const getTypeName = (type: string) => {
    switch (type) {
      case "bolt":
        return "Cıvata"
      case "nut":
        return "Somun"
      case "washer":
        return "Pul"
      default:
        return ""
    }
  }

  return (
    <div 
      className="min-h-screen bg-background py-12 px-4"
      style={{
        backgroundImage: "url(/ygo_logo_primary_opacity_30.svg)",
        backgroundSize: "400px 400px",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        backdropFilter: "blur(2px)",
        backgroundAttachment: "fixed",
        }}
        >
      <div className="container mx-auto max-w-7xl">

        
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Weight className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Cıvata Ağırlık Hesaplama</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Çelik montaj projelerinizde kullanacağınız cıvata, somun ve pulların toplam ağırlığını hesaplayın
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Bolt Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cıvata Ekle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bolt-size">Cıvata Tipi</Label>
                <div className="relative">
                  <Input
                    id="bolt-size"
                    type="text"
                    value={boltSearchQuery}
                    onChange={(e) => {
                      setBoltSearchQuery(e.target.value)
                      setIsBoltDropdownOpen(true)
                      setSelectedBoltSize("")
                    }}
                    onFocus={() => setIsBoltDropdownOpen(true)}
                    placeholder="Cıvata ara veya seçin"
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />

                  {isBoltDropdownOpen && filteredBolts.length > 0 && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsBoltDropdownOpen(false)} />
                      <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg max-h-[300px] overflow-y-auto">
                        {filteredBolts.map((bolt) => (
                          <button
                            key={bolt.label}
                            type="button"
                            onClick={() => {
                              setSelectedBoltSize(bolt.label)
                              setBoltSearchQuery(bolt.label)
                              setIsBoltDropdownOpen(false)
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-muted transition-colors cursor-pointer border-b last:border-b-0"
                          >
                            <div className="font-medium">{bolt.label}</div>
                            <div className="text-sm text-muted-foreground">Ağırlık: {bolt.weight} kg</div>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bolt-quantity">Adet</Label>
                <Input
                  id="bolt-quantity"
                  type="number"
                  min="0"
                  value={boltQuantity}
                  onChange={(e) => setBoltQuantity(Number(e.target.value))}
                  placeholder="Adet"
                />
              </div>

              <Button onClick={addBolt} className="w-full" disabled={!selectedBoltSize}>
                <Plus className="mr-2 h-4 w-4" />
                Listeye Cıvata Ekle
              </Button>
            </CardContent>
          </Card>

          {/* Nut Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Somun Ekle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nut-size">Somun Tipi</Label>
                <div className="relative">
                  <Input
                    id="nut-size"
                    type="text"
                    value={nutSearchQuery}
                    onChange={(e) => {
                      setNutSearchQuery(e.target.value)
                      setIsNutDropdownOpen(true)
                      setSelectedNutSize("")
                    }}
                    onFocus={() => setIsNutDropdownOpen(true)}
                    placeholder="Somun ara veya seçin"
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />

                  {isNutDropdownOpen && filteredNuts.length > 0 && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsNutDropdownOpen(false)} />
                      <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg max-h-[300px] overflow-y-auto">
                        {filteredNuts.map((nut) => (
                          <button
                            key={nut.label}
                            type="button"
                            onClick={() => {
                              setSelectedNutSize(nut.label)
                              setNutSearchQuery(nut.label)
                              setIsNutDropdownOpen(false)
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-muted transition-colors cursor-pointer border-b last:border-b-0"
                          >
                            <div className="font-medium">{nut.label}</div>
                            <div className="text-sm text-muted-foreground">Ağırlık: {nut.weight} kg</div>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nut-quantity">Adet</Label>
                <Input
                  id="nut-quantity"
                  type="number"
                  min="0"
                  value={nutQuantity}
                  onChange={(e) => setNutQuantity(Number(e.target.value))}
                  placeholder="Adet"
                />
              </div>

              <Button onClick={addNut} className="w-full" disabled={!selectedNutSize}>
                <Plus className="mr-2 h-4 w-4" />
                Listeye Somun Ekle
              </Button>
            </CardContent>
          </Card>

          {/* Washer Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pul Ekle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="washer-size">Pul Tipi</Label>
                <div className="relative">
                  <Input
                    id="washer-size"
                    type="text"
                    value={washerSearchQuery}
                    onChange={(e) => {
                      setWasherSearchQuery(e.target.value)
                      setIsWasherDropdownOpen(true)
                      setSelectedWasherSize("")
                    }}
                    onFocus={() => setIsWasherDropdownOpen(true)}
                    placeholder="Pul ara veya seçin"
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />

                  {isWasherDropdownOpen && filteredWashers.length > 0 && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsWasherDropdownOpen(false)} />
                      <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg max-h-[300px] overflow-y-auto">
                        {filteredWashers.map((washer) => (
                          <button
                            key={washer.label}
                            type="button"
                            onClick={() => {
                              setSelectedWasherSize(washer.label)
                              setWasherSearchQuery(washer.label)
                              setIsWasherDropdownOpen(false)
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-muted transition-colors cursor-pointer border-b last:border-b-0"
                          >
                            <div className="font-medium">{washer.label}</div>
                            <div className="text-sm text-muted-foreground">Ağırlık: {washer.weight} kg</div>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="washer-quantity">Adet</Label>
                <Input
                  id="washer-quantity"
                  type="number"
                  min="0"
                  value={washerQuantity}
                  onChange={(e) => setWasherQuantity(Number(e.target.value))}
                  placeholder="Adet"
                />
              </div>

              <Button onClick={addWasher} className="w-full" disabled={!selectedWasherSize}>
                <Plus className="mr-2 h-4 w-4" />
                Listeye Pul Ekle
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Hesaplama Listesi</CardTitle>
          </CardHeader>
          <CardContent>
            {itemList.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Weight className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">
                  Henüz eleman eklemediniz. Yukarıdaki kartlardan cıvata, somun veya pul ekleyin.
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-semibold">Tip</th>
                        <th className="text-left py-3 px-2 font-semibold">Boyut</th>
                        <th className="text-center py-3 px-2 font-semibold">Adet</th>
                        <th className="text-right py-3 px-2 font-semibold">Birim Ağırlık (kg)</th>
                        <th className="text-right py-3 px-2 font-semibold">Toplam (kg)</th>
                        <th className="text-center py-3 px-2 font-semibold w-[80px]">İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemList.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-2 font-medium">{getTypeName(item.type)}</td>
                          <td className="py-3 px-2">{item.size}</td>
                          <td className="py-3 px-2 text-center">
                            <Input
                              type="number"
                              min="0"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                              className="w-24 mx-auto text-center"
                            />
                          </td>
                          <td className="py-3 px-2 text-right">{item.unitWeight.toFixed(3)}</td>
                          <td className="py-3 px-2 text-right font-semibold">{item.totalWeight.toFixed(3)}</td>
                          <td className="py-3 px-2 text-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">GENEL TOPLAM</span>
                    <span className="text-3xl font-bold text-primary">{grandTotal.toFixed(3)} kg</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
