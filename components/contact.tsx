"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Mesajınız alındı! En kısa sürede size geri dönüş yapacağız.")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="iletisim" className="relative py-24 px-6 bg-secondary/30 overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url(/ygo_logo.svg)",
          backgroundSize: "200px 200px",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">İletişime Geçin</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Projeleriniz hakkında konuşmak için bizimle iletişime geçin
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-secondary shadow-md p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6">İletişim Bilgileri</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary text-primary-foreground rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold mb-1">E-posta</p>
                  <p className="text-muted-foreground">info@sirketiniz.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary text-primary-foreground rounded-lg">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Telefon</p>
                  <p className="text-muted-foreground">+90 (212) 123 45 67</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary text-primary-foreground rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Adres</p>
                  <p className="text-muted-foreground">
                    İstanbul, Türkiye
                    <br />
                    Levent Mahallesi, İş Merkezi
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary shadow-md p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Adınız Soyadınız</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Adınızı girin"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-posta adresinizi girin"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefon numaranızı girin"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mesajınız</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mesajınızı yazın..."
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Mesaj Gönder
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
